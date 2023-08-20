import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";


const Hero = () => (
    <Card className="max-w-[800px]">
        <CardHeader className="flex gap-3">
            <Image
                alt="logo"
                height={40}
                radius="sm"
                src="https://www.firefly.org/images/pictures/firefly-closeup.jpg"
                width={40}
            />
            <div className="flex flex-col">
                <p className="text-md">Built with NextUI</p>
                <p className="text-small text-default-500">nextui.org</p>
            </div>
        </CardHeader>
        <Divider/>
        <CardBody>
            <p>This is a sample application that demonstrates an authentication flow.</p>
        </CardBody>
        <Divider/>
        <CardFooter>
            <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
            >
                Visit source code on GitHub.
            </Link>
            <Link
                isExternal
                showAnchorIcon
                href="https://nextjs.org"
            >
                Next.js
            </Link>
        </CardFooter>
    </Card>
);

export default Hero;
