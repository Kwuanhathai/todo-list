import { Card, Row, Col, Typography, Modal } from "antd"
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const { Text } = Typography

function ToDoElement(props: any) {
    const { dataItem } = props
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [isDoneId, setIsDoneId] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [isDone, setIsDone] = useState(false)
    let navigate = useNavigate()


    const toggleIsDoneBg = (isDoneData: any) => {

        if (isDoneData == 1) {
            setBackgroundColor('lightblue')
        } else {
            setBackgroundColor('white')
        }
    };


    const onEditIconClick = (id: any) => {
        navigate(`edit/${id}`);
    };

    const onDeleteIconClick = async (id: any) => {
        setDeleteId(id)
        setIsModalOpen(true)
    };

    const handleOk = async () => {

        setIsModalOpen(false)

        try {
            const response = await axios.delete(`http://localhost:8000/api/todos/${deleteId}`)

            if (response.data != null) {
                setTimeout(function () {
                    Modal.success({
                        title: 'SUCCESSFULLY DELETED',
                        content: 'The to-do list has been deleted.',
                    });
                }, 1000);
            }

            setTimeout(function () {
                history.go(0)
            }, 4000);


        } catch (error) {
            console.error('Error:', error)

            Modal.error({
                title: 'DELETE FAILED',
                content: 'Please try again.',
            });

        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDeleteId(null)
    };

    const onCheckIconClick = async (id: any) => {
        setIsDoneId(id)
        setIsDoneModalOpen(true)
    };

    const handleIsDoneOk = async () => {

        setIsDoneModalOpen(false)

        try {
            const response = await axios.put(`http://localhost:8000/api/todos/${isDoneId}`, { isDone: isDone }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data != null) {
                setTimeout(function () {
                    Modal.success({
                        title: 'Done!'
                    });
                }, 1000);
            }

            setIsDone(!isDone)

            setTimeout(function () {
                history.go(0)
            }, 3000);


        } catch (error) {
            console.error('Error:', error)

        }
    };


    const handleIsDoneCancel = () => {
        setIsDoneModalOpen(false);
        setIsDoneId(null)
    };

    useEffect(() => {
        toggleIsDoneBg(dataItem?.isDone)
    }, [isDone])




    return (
        <>
            <Card style={{ width: '80vw', marginBottom: '1rem', background: backgroundColor }}>
                <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <Col span={12}>
                        <Row>
                            <Text style={{ fontWeight: 'bold', fontSize: '2rem' }}>{dataItem?.title}</Text>
                        </Row>
                        <Row>
                            <Text>{dataItem?.description == 'undefined' ? '' : dataItem?.description}</Text>
                        </Row>
                    </Col>
                    <Col span={12} style={{ display: "flex", alignItems: 'center', justifyContent: "end" }}>
                        <Row>
                            <Col style={{ paddingRight: '2rem', fontSize: '2rem' }}>
                                <CheckCircleOutlined style={{ color: '#3bb85c' }} onClick={() => onCheckIconClick(dataItem?.id)} />
                                <Modal title="Are you sure to do this?" open={isDoneModalOpen} onOk={handleIsDoneOk} onCancel={handleIsDoneCancel} />
                            </Col>
                            <Col style={{ paddingRight: '2rem', fontSize: '2rem' }}>
                                <EditOutlined style={{ color: '#0d59db' }} onClick={() => onEditIconClick(dataItem?.id)} />
                            </Col>
                            <Col style={{ fontSize: '2rem' }}>
                                <DeleteOutlined onClick={() => onDeleteIconClick(dataItem?.id)} style={{ color: '#db0d1e' }} />
                                <Modal title="Are you sure you want to delete this list?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default ToDoElement