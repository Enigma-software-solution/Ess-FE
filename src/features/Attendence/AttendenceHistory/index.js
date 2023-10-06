import React from 'react';
import { Collapse } from 'antd';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
    },
];
const AttendenceHistory = () => {

    return <Collapse items={items} style={{ width: "400px", height: "47px" }} />;
};
export default AttendenceHistory;