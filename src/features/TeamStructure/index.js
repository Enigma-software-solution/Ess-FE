import React from 'react';
import { Wrapper, Heading, TeamImage } from './styled';
import hirarchy from '../../assets/hirearchy.png';

const TeamStructure = () => {
    return (
        <Wrapper>
            <Heading>Team Structure</Heading>
            <TeamImage src={hirarchy} alt="Team Hierarchy" />
        </Wrapper>
    );
}

export default TeamStructure;
