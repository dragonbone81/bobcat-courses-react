import React from 'react'

const About = () => {
    return (
        <div style={{margin: 20}}>
            <div id="about_div" className="container-fluid" style={{textAlign: 'center'}}>
                <div className="row" id="about_content">
                    <div className="col-lg-12">
                        <h2 style={{textAlign: 'center'}} className="my-4">Our Team</h2>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-center mb-4 team-member">
                        <img className="rounded-circle img-fluid d-block mx-auto"
                             src="https://4qr7k2a2xza2vctux33bisalkw-wpengine.netdna-ssl.com/wp-content/uploads/2015/07/Full-time-hiring-8.2015-07-700x699.png"
                             alt=""/>
                        <h3>Maxime
                            <small>(iOS)</small>
                        </h3>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-center mb-4 team-member">
                        <img className="rounded-circle img-fluid d-block mx-auto"
                             src="https://i.imgur.com/6hnAn2a.png" alt=""/>
                        <h3>Christian
                            <small>(Django)</small>
                        </h3>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-center mb-4 team-member">
                        <img className="rounded-circle img-fluid d-block mx-auto"
                             src="https://chenglou.github.io/react/img/logo.svg"
                             alt=""/>
                        <h3>Miguel
                            <small>(React)</small>
                        </h3>
                    </div>
                    <div className="col-lg-6 col-sm-6 text-center mb-4 team-member">
                        <img className="rounded-circle img-fluid d-block mx-auto"
                             src="https://blog.siliconstraits.vn/wp-content/uploads/2015/07/Full-time-hiring-8.2015-08-e1440676569839.png"
                             alt=""/>
                        <h3>Fisher
                            <small>(Android)</small>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default About