import React from 'react'
import DRELB from '../../assets/images/demo-real-estate-logo-black.png'

const Footer = () => {
  return (
    <div>
      <footer className="footer-light bg-gradient-very-light-gray pb-0">
            <div className="container position-relative pt-3 pb-3 overlap-section md-mb-15px">
                <div className="position-absolute left-0px top-0px background-no-repeat background-size-100 h-100 w-100 animation-float" style={{backgroundImage: "url('https://via.placeholder.com/1190x262')"}}></div>
                <div className="row row-cols-1 row-cols-lg-2 justify-content-center align-items-center bg-base-color pt-4 pb-4 ps-6 pe-6 lg-p-5 border-radius-6px g-0">
                    <div className="col-xl-6 col-lg-7 md-mb-25px sm-mb-15px position-relative text-center text-lg-start"> 
                        <h3 className="alt-font fw-500 text-white ls-minus-1px mb-10px shadow-none" data-shadow-animation="true" data-animation-delay="700">Subscribe to <span className="fw-700 text-highlight d-inline-block">newsletter<span className="bg-white h-10px bottom-1px opacity-3 separator-animation"></span></span></h3>
                        <span className="fs-20 text-white">Social media its ways of our excellence.</span>
                    </div>
                    <div className="col-lg-5 offset-xl-1 position-relative"> 
                        <div className="d-inline-block w-100 newsletter-style-03 position-relative">
                            <form action="email-templates/subscribe-newsletter.php" method="post" className="position-relative w-100">
                                <input className="input-large bg-white border-color-white w-100 box-shadow-extra-large form-control required" type="email" name="email" placeholder="Enter your email..." />
                                <input type="hidden" name="redirect" value="" />
                                <button className="btn btn-large text-dark-gray ls-0px left-icon submit fw-700" aria-label="submit"><i className="icon feather icon-feather-mail icon-small text-base-color"></i><span>Subscribe</span></button>
                                <div className="form-results border-radius-4px pt-10px pb-10px ps-15px pe-15px fs-16 lh-22 mt-10px w-100 text-center position-absolute d-none"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-auto d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                        <div className="text-dark-gray fs-28 alt-font fw-500">1M+ property ready to <span className="fw-700 text-decoration-line-bottom">buying and selling.</span></div>
                        <div className="bg-white border-radius-50px d-flex align-items-center p-10px ps-35px ms-20px md-ps-20px md-ms-15px box-shadow-medium sm-m-20px">
                            <a href="demo-real-estate-contact.html" className="text-dark-gray fs-22 alt-font fw-500 me-10px overflow-hidden">Say, <span className="fw-700 w-65px text-start d-inline-block" data-fancy-text='{ "effect": "rotate", "string": ["Hello!", "Salve!", "Hallå!"] }'></span></a>
                            <span className="text-dark-gray h-45px w-45px text-center d-flex align-items-center justify-content-center border-radius-100 bg-base-color-transparent fs-20">&#128075;</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5 mb-4 sm-mb-35px">
                    <div className="col-lg-3 last-paragraph-no-margin md-mb-35px text-center text-lg-start">
                        <a href="demo-real-estate.html" className="footer-logo mb-10px d-inline-block"><img src={DRELB} data-at2x="images/demo-real-estate-logo-black@2x.png" alt="" /></a>
                        <p className="w-85 lg-w-100">Lorem ipsum text adipiscing eiusmod elit incididunt enim.</p>
                        <div className="elements-social social-icon-style-02 mt-15px">
                            <ul className="small-icon dark">
                                <li><a className="facebook" href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a className="dribbble" href="http://www.dribbble.com" target="_blank"><i className="fa-brands fa-dribbble"></i></a></li> 
                                <li><a className="twitter" href="http://www.twitter.com" target="_blank"><i className="fa-brands fa-twitter"></i></a></li> 
                                <li><a className="instagram" href="http://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></a></li> 
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 sm-mb-25px">
                        <span className="alt-font fs-18 fw-600 d-block text-dark-gray mb-5px">Company</span>
                        <ul>
                            <li><a href="demo-real-estate-about.html">About us</a></li>
                            <li><a href="demo-real-estate-agents.html">Our agent</a></li>
                            <li><a href="demo-real-estate-blog.html">Latest blog</a></li>
                            <li><a href="demo-real-estate-contact.html">Contact us</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3 sm-mb-25px">
                        <span className="alt-font fs-18 fw-600 d-block text-dark-gray mb-5px">Resources</span>
                        <ul>
                            <li><a href="demo-real-estate-rent.html">Rent a home</a></li>
                            <li><a href="demo-real-estate-sell.html">Sell a home</a></li>
                            <li><a href="demo-real-estate-agents.html">Ready to move</a></li>
                            <li><a href="demo-real-estate-about.html">Budget homes</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3">
                        <span className="alt-font fs-18 fw-600 d-block text-dark-gray mb-5px">Customer</span>
                        <ul>                           
                            <li><a href="demo-real-estate-contact.html">Client support</a></li>
                            <li><a href="demo-real-estate-contact.html">Help center</a></li>
                            <li><a href="demo-real-estate-contact.html">System status</a></li>
                            <li><a href="demo-real-estate-contact.html">Feedback</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-lg-2 col-md-3">
                        <span className="alt-font fs-18 fw-600 d-block text-dark-gray mb-10px">Say hello</span>
                        <span className="d-block lh-normal">Need support?</span>
                        <a href="mailto:info@domain.com" className="text-dark-gray text-decoration-line-bottom lh-22 d-inline-block mb-20px">info@domain.com</a>
                        <span className="d-block lh-normal">Customer care</span>
                        <a href="tel:12345678910" className="text-dark-gray text-decoration-line-bottom lh-22 d-inline-block">+1 234 567 8910</a>
                    </div>                  
                </div>
                <div className="border-top border-color-extra-medium-gray pt-35px pb-35px text-center">
                    <span className="fs-13 w-60 lg-w-70 md-w-90 sm-w-100 d-block mx-auto lh-22">This site is protected by reCAPTCHA and the Google <a href="#" className="text-dark-gray text-decoration-line-bottom">privacy policy</a> and <a href="#" className="text-dark-gray text-decoration-line-bottom">terms of service</a> apply. You must not use this website if you disagree with any of these website standard terms and conditions.</span>
                </div>
            </div> 
        </footer>
    </div>
  )
}

export default Footer
