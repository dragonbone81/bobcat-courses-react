import React, {Component} from 'react'
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class AutoComplete extends Component {
    state = {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
    };
    handleSearch = (query) => {
        this.setState({isLoading: true});
        this.props.api.get('courses/course-search/', {
            params: {
                course: query,
                term: 201830,
            }
        }).then((response) => {
            this.setState({
                options: response.data,
                isLoading: false,
            })
        });
    };
    handleSelected = (course) => {
        if (course[0]) {
            this.props.api.post('courses/course-match/', {
                course_list: [course[0].name],
                term: 201830,
            }).then((response) => {
                this.props.setCourses(response.data, course[0].name);
            })
        }
    };

    render() {
        return (
            <AsyncTypeahead
                {...this.state}
                minLength={3}
                onSearch={this.handleSearch}
                onChange={this.handleSelected}
                placeholder="Search for a Course"
                labelKey='name'
                filterBy={() => true}
                renderMenuItemChildren={(option, props) => (
                    <div id={option.name}>{option.name}</div>
                )}
            />
        )
    }
}

export default AutoComplete