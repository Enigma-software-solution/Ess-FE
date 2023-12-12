// ErrorBoundary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import {
    ErrorBoundaryWrapper,
    ErrorMessage,
} from './styled';
import { Button, Flex } from 'antd';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        resetErrorBoundary()
    };

    return (
        <ErrorBoundaryWrapper>
            <ErrorMessage>Something went wrong:</ErrorMessage>
            <p>{error.message}</p>
            <p>{error.stack}</p>
            <Flex gap={20}>
                <Button type='primary' onClick={resetErrorBoundary}>Retry</Button>
                <Button onClick={handleClick}>Go to Home</Button>
            </Flex>
        </ErrorBoundaryWrapper>
    );
}

const ErrorBoundary = ({ children }) => (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
    </ReactErrorBoundary>
);

export default ErrorBoundary;
