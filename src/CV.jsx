import { useNavigate } from 'react-router-dom';
import './App.css';

function CV() {
    const navigate = useNavigate();

    return (
        <div className="cv-container">
            <header className="cv-header">
                <h1
                    className="cv-title clickable"
                    onClick={() => navigate('/')}
                >
                    <span className="word-line">I'm</span>
                    <span className="word-line">Sam</span>
                    <span className="word-line">Green<span className="blue-dot">.</span></span>
                </h1>
                <div className="cv-location">
                    <span>Dubai, United Arab Emirates</span>
                </div>
                <div className="cv-contact">
                    <span>
                        <a href="https://linkedin.com/in/samjohngreen" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        {" | "}
                        <a href="tel:+971559661149">+971 55 966 1149</a>
                        {" | "}
                        <a href="mailto:sam.jgreen@outlook.com">sam.jgreen@outlook.com</a>
                    </span>
                </div>
            </header>
            <hr />

            <section className="cv-section">
                <h2>Professional Summary</h2>
                <p>
                    Experienced and driven Solution Consultant with nearly eight years of proven success in SaaS sales.
                    I am dedicated to delivering value both as a leader and team player within my team and culturally throughout my organisation.
                    I have excelled as a trusted advisor to companies of all sizes and am eager to deliver exceptional outcomes.
                </p>
            </section>

            <hr />

            <section className="cv-section">
                <h2>Experience</h2>

                <div className="cv-job">
                    <h3>ServiceNow</h3>
                    <div>
                        <strong>Senior Solution Consultant, Ireland</strong>
                        <span className="cv-dates">May 2023 — Present</span>
                        <ul>
                            <li>Qualify and showcase the value of ServiceNow across healthcare, retail and education sectors in Ireland</li>
                            <li>Design and deliver tailored demonstrations at c-level focused events, collaborating closely with the wider sales teams</li>
                            <li>Invest time in GenAI advancements on the Now Platform and the broader enterprise software landscape</li>
                            <li>Lead and inspire Culture Champions team of 12 to foster a positive and inclusive workplace culture</li>
                        </ul>
                    </div>
                    <div>
                        <strong>Advisory Digital Solution Consultant, ITOM</strong>
                        <span className="cv-dates">Nov 2021 — May 2023</span>
                        <ul>
                            <li>First EMEA Digital Specialist Solution Consultant with a focus on ITOM and Service Operations growth in EMEA</li>
                            <li>Enabled and supported sales teams, developed strategic initiatives and delivered monthly ITOM webinars</li>
                            <li>Enhanced client relationships, improved adoption and met revenue targets across multi-product sales cycles</li>
                            <li>Achieved 115% targeted quota across legal, engineering and software organisations</li>
                        </ul>
                    </div>
                </div>

                <div className="cv-job">
                    <h3>Salesforce</h3>
                    <div>
                        <strong>Solution Engineer, UK&I</strong>
                        <span className="cv-dates">Sept 2018 — Oct 2021</span>
                        <ul>
                            <li>Coordinated and led sales cycles in the UKI SMB market; focused on professional services industry</li>
                            <li>Developed an integrated platform for weekly webinars, attracting 100s+ of unique viewers each month</li>
                            <li>Created enablement materials which became a standard across EMEA sales onboarding</li>
                            <li>Closed $3m+ of business (2019-21) with an average close rate of 55%, incl. 3x $500k+ SMB opportunities</li>
                        </ul>
                    </div>
                </div>

                <div className="cv-job">
                    <h3>Tangent @ Portal (formerly TCD LaunchBox)</h3>
                    <div>
                        <strong>Entrepreneur in Residence</strong>
                        <span className="cv-dates">Jan 2018 — Aug 2018</span>
                        <ul>
                            <li>Co-founded a startup aimed at digitising restaurant operations through an integrated platform for front-and-back-office management, Dockit</li>
                            <li>Gained valuable lessons in product development, market analysis, problem solving and resiliency</li>
                        </ul>
                    </div>
                </div>
            </section>

            <hr />

            <section className="cv-section">
                <h2>Education & Certifications</h2>
                <ul>
                    <li><strong>II.1 Honours, Computer Science & Business</strong>, Trinity College Dublin, Ireland, 2014–2018</li>
                    <li><strong>Distinction, Entrepreneurship: Venture Creation</strong>, Saïd Business School, University of Oxford, Oct–Dec 2020</li>
                    <li><strong>Negotiation Skills Mastery</strong>, Harvard Business School Online, Sept–Nov 2023</li>
                    <li>Completed Professional Services Leader Training & Youd Andrews CxO Business Simulator</li>
                    <li>ServiceNow CSA, ITIL, 2Win! Storytelling & Demo certified, 6x Salesforce certifications & 2x product specialisations</li>
                </ul>
            </section>

            <hr />

            <section className="cv-section">
                <h2>Skills & Hobbies</h2>
                <ul>
                    <li>2024 ServiceNow Culture Champions Chair; raised €15,000+ for Cancer Ireland, AsIAm, RMcD House & Tiglin</li>
                    <li>Movember Ambassador, led Trinity College Dublin team in raising €3k+ through college society-partnered events</li>
                    <li>Avid golfer, captained Arklow Golf Club junior division (18-handicap)</li>
                    <li>Love exploring new places and cultures; excited to move to Singapore</li>
                </ul>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <a href="#" onClick={(e) => { e.preventDefault(); }} className="footer-link active">My CV</a>
                </div>
            </footer>
        </div>
    );
}

export default CV;