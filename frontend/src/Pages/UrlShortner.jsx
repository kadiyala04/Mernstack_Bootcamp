import { useState } from "react";
import { Center, Stack, Text, TextInput, Button } from "@mantine/core";
import Service from "../utils/http";
import { Anchor } from "@mantine/core";
import { QRCodeSVG } from 'qrcode.react';
const UrlShortner = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [customLink, setCustomLink] = useState("");
    const [title, setTitle] = useState("");
    const [expiry, setExpiry] = useState("");
    const [shortUrlData, setShortUrlData] = useState(null);
    const service = new Service();
    const getShortUrl = async () => {
        const response = await service.post('s', {
            customUrl: customLink,
            originalUrl,
            expiresAt: expiry,
            title
        });
        console.log(response)
        setShortUrlData(response);
    }


    return (
        <Center style={{ height: "90vh" }}>
            <Stack style={{ width: '40vw' }}>
                {!shortUrlData ?
                    <>
                        <Text size="30px">
                            Shorten Your URL Here
                        </Text>

                        <TextInput
                            label="Original Url"
                            withAsterisk
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            value={originalUrl}
                            radius={'md'}
                        />

                        <TextInput
                            label="Customize your url (Optional)"
                            onChange={(e) => setCustomLink(e.target.value)}
                            value={customLink}
                            radius={'md'}
                        />

                        <TextInput
                            label="Title (Optional)"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            radius={'md'}
                        />

                        <TextInput
                            label="Date of Expiry (Optional)"
                            onChange={(e) => setExpiry(e.target.value)}
                            value={expiry}
                            type="date"
                            radius={'md'}
                        />

                        <Button variant="outline" disabled={!originalUrl} onClick={getShortUrl} radius={'md'}>
                            Generate and Shorten Url
                        </Button>

                    </>
                    :
                    <>
                        <Anchor href={
                            `${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`
                        }>
                            {shortUrlData?.shortCode}
                        </Anchor>
                        < QRCodeSVG value={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`} />
                    </>

                }
            </Stack>
        </Center>
    );
};

export default UrlShortner;
