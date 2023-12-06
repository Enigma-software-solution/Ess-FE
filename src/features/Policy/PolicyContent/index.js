import React from 'react'
import { Wrapper } from './styled'

const PolicyContent = ({ selectedPolicy }) => {
    return (
        <Wrapper className='p-5'>
            {selectedPolicy === 'Introduction' && (
                <div>
                    <h1>Terms of Services</h1>
                    <h3> 1. Introduction Policy</h3>
                    <p>
                        This policy aims to provide an overview of our company's goals and mission.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla, erat id placerat ultricies,
                        eros sapien varius odio, nec eleifend nisi arcu non est.
                    </p>
                </div>
            )}

            {selectedPolicy === 'Accountability Provision' && (
                <div>
                    <h1>Terms of Services</h1>

                    <h3>2. Accountability</h3>
                    <p>
                        Accountability within policy formulation and implementation is the compass guiding ethical governance. It demands meticulous attention to the repercussions of decisions, fostering a culture of ownership and integrity. Upholding accountability fosters public confidence, driving effective and sustainable change. It's not just a checkbox; it's the bedrock of a responsible and responsive society
                    </p>
                </div>
            )}
            {selectedPolicy === 'Liability Provision' && (
                <div>
                    <h1>Terms of Services</h1>
                    <h3>3. Liability Provision</h3>
                    <p>
                        Liability provisions within policies are critical safety nets. They delineate responsibility, outlining consequences and legal obligations. These provisions establish a framework for accountability, ensuring fairness and protection for all involved parties. Comprehensive liability provisions foster a culture of transparency, mitigate risks, and promote ethical behavior within the scope of policy implementation.
                    </p>
                </div>
            )}
            {selectedPolicy === 'Privacy Policies' && (
                <div>
                    <h1>Terms of Services</h1>
                    <h3>4. Privacy Policies</h3>
                    <p>
                        Privacy policies are the safeguarding blueprints of personal data. They delineate how information is collected, used, and protected, ensuring transparency and trust between users and organizations. Effective privacy policies articulate rights, disclose practices, and outline measures for data security and confidentiality. They're not just legal documents; they're promises of respect and accountability for individuals' privacy in the digital age.
                    </p>
                </div>
            )}
            {selectedPolicy === 'Right to Termination' && (
                <div>
                    <h1>Terms of Services</h1>
                    <h3>5. Right to Termination</h3>
                    <p>
                        The "right to termination" is a crucial aspect of various agreements or contracts, empowering individuals or entities to end their commitments under specific conditions. This right grants the freedom to discontinue a relationship, service, or agreement without facing undue repercussions, provided certain terms or procedures are followed. It ensures fairness and flexibility, allowing parties to exit agreements if circumstances change or obligations aren't met as agreed upon, fostering a balanced and equitable relationship.
                    </p>
                </div>
            )}

        </Wrapper>
    )
}

export default PolicyContent