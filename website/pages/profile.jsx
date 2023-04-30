import getConfig from 'next/config'
import React from 'react';
import {Row, Col} from 'reactstrap';
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0/client';
import {getQueryResponse} from "graphql-middleware";
import {getResponse} from "http-middleware";

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';

export function Profile() {
    const {user, isLoading} = useUser();

    return (
        <>
            {isLoading && <Loading/>}
            {user && (
                <>
                    <Row className="align-items-center profile-header mb-5 text-center text-md-left"
                         data-testid="profile">
                        <Col md={2}>
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                                decode="async"
                                data-testid="profile-picture"
                            />
                        </Col>
                        <Col md>
                            <h2 data-testid="profile-name">{user.name}</h2>
                            <p className="lead text-muted" data-testid="profile-email">
                                {user.email}
                            </p>
                        </Col>
                    </Row>
                    <Row data-testid="profile-json">
                        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
                    </Row>
                </>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    try {

        const results = await getResponse(
            process.env.AEM_HOST_URI + process.env.AEM_GRAPHQL_ENDPOINT
        )

        console.log(results?.data?.recipeList)

        // get locale from context
        const {locale} = context
        const {serverRuntimeConfig} = getConfig()
        console.log(serverRuntimeConfig)

        return {
            props: {
                serverRuntimeConfig,
                error: null
            },
        }

    } catch (e) {
        console.error('Unable to load profile page. An unexpected error occurred:', e)
        return {
            props: {
                serverRuntimeConfig: null,
                error: '500'
            },
        }
    }
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <Loading/>,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
