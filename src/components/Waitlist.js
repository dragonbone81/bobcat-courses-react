import React, {Component} from 'react'
import AutoComplete from './AutoComplete'
import {Redirect} from 'react-router-dom'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'


const CourseCard = ({sections, title, error, onClick, selected, type, waitlists}) => {
    let waitlistsItems = [];
    if (waitlists)
        waitlistsItems = waitlists.map((waitlist) => waitlist.crn);
    let listItems = sections.length > 0 ?
        sections.filter((section) => {
            return type === 'sections' ? !waitlistsItems.includes(section.crn) : true;
        }).map((section, index) => {
                let className = 'waitlist-item ';
                if (index === selected)
                    className += 'selected-waitlist ';
                else {
                    section.available <= 0 ? className += 'full' : className += 'not-full';
                }
                return <li onClick={() => onClick(index)} key={index}
                           className={className}>{section.course_id}: {section.crn}</li>
            }
        )
        :
        <div className="card-body"><FontAwesomeIcon style={{fontSize: 30}} icon={faSpinner} spin/></div>;
    if (listItems.length === 0)
        listItems = <div className="card-body">No More Sections</div>;
    return (
        <div className="card mx-auto border-primary"
             style={{maxWidth: 300, marginBottom: 20}}>
            <div className="card-header">
                {title}
            </div>
            <div className="scrollable-card" style={{overflowY: 'auto', maxHeight: 300}}>
                <ul className="list-group list-group-flush" id="card_list" style={{cursor: 'pointer'}}>
                    {listItems}
                </ul>
            </div>
        </div>
    )
};
const WaitlistDetailCard = ({waitlist, title, error}) => {
    const style = waitlist ? waitlist.course.available > 0 ? 'section-card-space' : 'section-card-full' : '';
    const cardBody = waitlist ?
        <div style={{textAlign: 'left'}}>
            <b>Course:</b> {waitlist.course.course_name}--{waitlist.course.type}<br/>
            <b>Course ID:</b> {waitlist.course.course_id}<br/>
            <b>Available Seats:</b> {waitlist.course.available}<br/>
            <b>Total Seats:</b> {waitlist.course.capacity}<br/>
            <b>People in Waitlist:</b> {waitlist.users}<br/>
            {waitlist.course.available > 0 ? <b style={{fontSize: 20}}>Section HAS space</b> :
                <b style={{fontSize: 20}}>Section is FULL</b>}
        </div> :
        <div><FontAwesomeIcon style={{fontSize: 30}} icon={faSpinner} spin/></div>;
    return (
        <div className="card mx-auto border-primary"
             style={{maxWidth: 300, marginBottom: 20}}>
            <div className="card-header">
                {title}
            </div>
            <div className="scrollable-card" style={{overflowY: 'auto', maxHeight: 300}}>
                <div className={"card-body " + style}>
                    {cardBody}
                </div>
            </div>
        </div>
    )
};
const SectionDetailCard = ({course, title, switchView}) => {
    const style = course ? course.available > 0 ? 'section-card-space' : 'section-card-full' : '';
    const cardBody = course ?
        <div style={{textAlign: 'left'}}>
            <b>Course:</b> {course.course_name}--{course.type}<br/>
            <b>Course ID:</b> {course.course_id}<br/>
            <b>Available Seats:</b> {course.available}<br/>
            <b>Total Seats:</b> {course.capacity}<br/>
            {course.available > 0 ? <b style={{fontSize: 20}}>Section HAS space</b> :
                <b style={{fontSize: 20}}>Section is FULL</b>}<br/>
            <button onClick={switchView} style={{marginTop: 10, marginBottom: 10, fontSize: 20}}
                    className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowLeft}/> Back
            </button>
            <button style={{marginTop: 10, marginBottom: 10, fontSize: 20}} className="btn btn-primary float-right">
                Add <FontAwesomeIcon icon={faArrowRight}/>
            </button>
        </div> :
        <div><FontAwesomeIcon style={{fontSize: 30}} icon={faSpinner} spin/></div>;
    return (
        <div className="card mx-auto border-primary"
             style={{maxWidth: 300, marginBottom: 20}}>
            <div className="card-header">
                {title}
            </div>
            <div className="scrollable-card" style={{overflowY: 'auto', maxHeight: 300}}>
                <div className={"card-body " + style}>
                    {cardBody}
                </div>
            </div>
        </div>
    )
};

class Waitlist extends Component {
    state = {
        topCourseSections: {},
        topCourse: '',
        waitlists: [],
        selectedWaitlistIndex: 0,
        selectedSectionIndex: 0,
        detailView: false,
        maxRetrys: 3,
    };
    waitlistSelected = (index) => {
        this.setState({
            selectedWaitlistIndex: index,
        })
    };
    setWaitlistTopCourseSections = (sections, topCourse) => {
        this.setState({
            topCourseSections: sections,
            topCourse: topCourse,
        })
    };
    getCourseSections = () => {
        if (this.state.topCourse && this.state.topCourseSections) {
            return this.state.topCourseSections[this.state.topCourse]
        } else {
            return []
        }
    };
    getUserWaitlists = () => {
        if ((!this.props.api.defaults.headers.Authorization || this.props.api.defaults.headers.Authorization === 'Bearer undefined')) {
            this.setState({
                maxRetrys: this.state.maxRetrys - 1,
            });
            if (this.state.maxRetrys > 0)
                setTimeout(() => this.getUserWaitlists(), 100);
            else {
                return null
            }
        } else {
            this.props.api.get('users/waitlist/').then((response) => {
                this.setState({waitlists: response.data})
            })
        }
    };
    getUserWaitlistFilter = () => {
        return this.state.waitlists.map((waitlist) => waitlist.course);
    };
    getSelectedWaitlist = () => {
        return this.state.waitlists[this.state.selectedWaitlistIndex];
    };
    switchToAllSections = () => {
        this.setState({
            detailView: false,
        })
    };

    componentDidMount() {
        this.getUserWaitlists();
    }

    sectionSelected = (index) => {
        this.setState({detailView: true, selectedSectionIndex: index});
    };

    render() {
        if (!this.props.user.access)
            return <Redirect to='/'/>;
        return (
            <div style={{margin: 20}}>
                <div className="container-fluid"
                     style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 10, padding: 10}}>
                    <div className="row">
                        <div className="col-md-4">
                            <div style={{maxWidth: 300, margin: 'auto'}}>
                                <div style={{marginBottom: 20, textAlign: 'center'}}>
                                    <h2>Search</h2>
                                    <AutoComplete api={this.props.api}
                                                  setCourses={this.setWaitlistTopCourseSections}/>
                                </div>
                                {this.state.topCourse ?
                                    this.state.detailView ? <SectionDetailCard
                                            course={this.getCourseSections()[this.state.selectedSectionIndex]}
                                            title={'Section Details'} error={'Please Reload'}
                                            switchView={this.switchToAllSections}/> :
                                        <CourseCard waitlists={this.getUserWaitlistFilter()}
                                                    onClick={this.sectionSelected} sections={this.getCourseSections()}
                                                    type={'sections'} title={'Sections'}
                                                    error={'No Sections Found'}/> : ''}
                            </div>
                        </div>
                        <div className="col-md-4" style={{textAlign: 'center'}}>
                            <h2>Select</h2>
                            <CourseCard onClick={this.waitlistSelected} sections={this.getUserWaitlistFilter()}
                                        title={'Your Waitlists'}
                                        error={'No Sections Found'} selected={this.state.selectedWaitlistIndex}/>
                        </div>
                        <div className="col-md-4" style={{textAlign: 'center'}}>
                            <h2>View</h2>
                            <WaitlistDetailCard waitlist={this.getSelectedWaitlist()} title={'Details'}
                                                error={'No Waitlist Selected'}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Waitlist