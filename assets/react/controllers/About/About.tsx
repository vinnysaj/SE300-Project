import React, {ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";

const About: React.FC = () => {
    return (
        <div className="h-full w-full">
            <Navbar pageTitle={"About"}/>
            <div className="h-screen w-screen pb-20 bg-white">
                <div className="flex flex-col items-start justify-center h-full text-black pt-12 md:pt-0 w-10/12 md:w-2/3 mx-auto">
                    <div className="text-4xl md:text-6xl lg:text-8xl font-bold">What Is BoundlessFlight?</div>
                    <div className="text-xl md:text-2xl lg:text-4xl font-medium text-gray-800 mt-1">A quick and easy solution to tracking your aircraft's safety and reliability.</div>
                    <div className="flex flex-wrap justify-center mt-10 gap-10">
                        <AboutCard
                            title={"Live Updates"}
                            desc={"Reminders on upcoming maintenance dates, mileage counts, or both!"}
                            svg={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 inline-block">
                                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z"></path>
                                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd"></path>
                                </svg>
                            }
                        />
                        <AboutCard
                            title={"Real-Time Tracking"}
                            desc={"BoundlessFlight immediately tracks your plane's mileage the moment your plane takes off."}
                            svg={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 inline-block">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd"/>
                                </svg>
                            }
                        />
                        <AboutCard
                            title={"Automated Document Scanning"}
                            desc={"With AI powered OCR and document scanning, digitize all your current and future maintenance documents."}
                            svg={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 inline-block">
                                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd"/>
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="h-screen w-screen bg-gray-100">
                <div className="flex flex-col items-center justify-center h-full w-full text-gray-800">
                    <div className="text-6xl font-bold">Meet the Team</div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 mt-4">We get the job done, so you can fly safely!
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <AboutUserCard name={"Christopher Allen"} role={"Backend Developer, ADS-B Provider"} img_url={"#"}/>
                        <AboutUserCard name={"Lucca DiMario"} role={"Frontend Developer, OCR Processing Developer"}
                                   img_url={"#"}/>
                        <AboutUserCard name={"Vincent Sajkowski"} role={"Frontend Developer, Server Management"}
                                   img_url={"#"}/>
                        <AboutUserCard name={"Ryle Traub"} role={"Realtime ADS-B Developer"} img_url={"#"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AboutCard: React.FC<AboutProps> = (props) => {
     return (
         <div className="flex rounded-2xl bg-gray-200 drop-shadow-lg shadow-xl w-full md:w-1/3 p-4">
             <div className="w-1/4 flex justify-center items-center">
                 {props.svg}
             </div>
             <div className="w-3/4 flex flex-col justify-center">
                 <h2 className="text-2xl font-bold mb-2">{props.title}</h2>
                 <p className="text-gray-600">{props.desc}</p>
             </div>
         </div>
     )
}

const AboutUserCard: React.FC<AboutUserProps> = (props) => {
    return (
        <div className="card w-64 text-center">
            <div className="relative w-full h-40">
                <div
                    className="w-24 h-24 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full overflow-hidden">
                    <img src={props.img_url} className="h-full w-full" alt={`${props.name}'s Profile`}/>
                </div>
            </div>
            <div className="card-content">
                <h2 className="text-2xl font-bold mt-4 mb-2">{props.name}</h2>
                <p className="text-gray-600">{props.role}</p>
            </div>
        </div>
    )
}

export interface AboutProps {
    title: string;
    desc: string;
    svg: ReactNode;
}

export interface AboutUserProps {
    name: string;
    role: string;
    img_url: string;
}

export default About;
