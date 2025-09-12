import React, { useEffect, useState } from 'react'
import Service from '../utils/http';
import { Anchor, Table, Text } from '@mantine/core';


const MyUrls = () => {
    const [data, setData] = useState([]);
    const service = new Service();
    const getData = async () => {
        try {
            const response = await service.get("user/my/urls")
            console.log(response);
            setData(response.shortURLs);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Original URL</Table.Th>
                        <Table.Th>Short Code</Table.Th>
                        <Table.Th>Click Count</Table.Th>
                        <Table.Th>User Id</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data && data.map((d) =>
                    (
                        <Table.Tr key={d._id}>
                            <Table.Td>
                                <Text>{d?.title || "NA"}</Text>
                            </Table.Td>
                            <Table.Td>
                                <Anchor href={d?.originalUrl} target='blank'>
                                    {d?.originalUrl}</Anchor>
                            </Table.Td>
                            <Table.Td>
                                <Anchor href={d?.shortCode} target='blank'>
                                    {d?.shortCode}</Anchor>
                            </Table.Td>
                            <Table.Td>
                                <Text>{d?.clickCount}</Text>
                            </Table.Td>
                            <Table.Td>
                                <Text>{d?.userId}</Text>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default MyUrls