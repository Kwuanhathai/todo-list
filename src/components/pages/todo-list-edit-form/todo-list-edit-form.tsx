import { Card, Typography, Row, Input, Form, Button, Modal } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Text } = Typography
const { TextArea } = Input

type FieldType = {
    title?: string;
    description?: string;
    isDone?: string;
};

function TodoListEditForm() {
    let navigate = useNavigate()
    const { todoID } = useParams();
    const [initialValues, setInitialValues] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState(initialValues);
    const headers = {
        'Content-Type': 'application/json',
    };
    console.log(`todoID new: ${todoID}`)

    const handleInputChange = (fieldName: any, value: any) => {
        setFormValues({ ...formValues, [fieldName]: value });
    };


    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:8000/api/todos/${todoID}`).then(({ data }) => {

                const resData = data?.todo

                if (resData && resData?.description == 'undefined') {
                    resData.description = ""
                }

                setInitialValues(resData)

            }).catch(({ response: { data } }) => {
                console.log(data.message)
            }).finally(() => {
                { setLoading(false) }
            })
        }

        fetchData()
    }, [])


    if (loading) {
        return <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoadingOutlined style={{ fontSize: "10rem", fontWeight: "bold", color: "white", marginRight: "1%" }} />
            <Text style={{ fontSize: "3.2rem", fontWeight: "bold", color: "white" }}>Loading...</Text>
        </div>
    }


    const goToPHomePage = () => {
        navigate(`/`);
    };


    const onFinish = async () => {
        try {
            const editedData = { ...initialValues };
            Object.keys(formValues).forEach((key) => {
                if (formValues[key] !== initialValues[key]) {
                    editedData[key] = formValues[key];
                }
            });

            const { title, description } = editedData;

            const response = await axios.put(`http://localhost:8000/api/todos/${todoID}`, {
                title: title,
                description: description,
            }, { headers });

            if (response.data != null) {
                Modal.success({
                    title: 'UPDATE SUCCESSFUL',
                    content: 'Information has been updated.',
                });
            }

            setTimeout(function () {
                history.go(0)
            }, 3000);
        } catch (error) {
            console.error('Error:', error);

            Modal.error({
                title: 'UPDATE FAILED',
                content: 'Please try again.',
            });
        }
    };


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    top: '5rem',
                    bottom: '5rem'
                }}
            >
                <Card
                    style={{
                        width: "75%",
                        height: "85vh",
                        padding: "1rem",
                        borderRadius: "2rem",
                        backgroundColor: "rgba(212, 195, 207, 0.906)",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        overflowX: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            paddingTop: '5rem',
                            paddingBottom: '3rem',
                            justifyContent: 'center',
                        }}
                    >
                        <Card style={{ width: '50vw' }}>
                            <Row justify="center">
                                <Text
                                    style={{
                                        fontSize: "2.4rem",
                                        fontFamily: "mali",
                                        fontWeight: "bold",
                                        paddingBottom: "2rem",
                                        paddingTop: "1rem",
                                    }}
                                >
                                    Edit to-do details
                                </Text>
                            </Row>

                            <Form
                                name="edit_todo"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                method="put"
                                form={form}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Form.Item<FieldType>
                                        label="Title"
                                        name="title"
                                        initialValue={initialValues?.title}
                                        style={{
                                            width: "100%",
                                            fontWeight: "bold"
                                        }}
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 19 }}
                                        rules={[{ required: true, message: 'Please input your title!' }]}
                                    >
                                        <Input
                                            name="title"
                                            value={formValues?.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item<FieldType>
                                        label="Description"
                                        name="description"
                                        initialValue={initialValues?.description}
                                        style={{
                                            width: "100%",
                                            fontWeight: "bold"
                                        }}
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 19 }}
                                    >
                                        <TextArea
                                            rows={5}
                                            name="description"
                                            value={formValues?.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row justify='center'>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3bb85c', fontWeight: 'bold' }}>
                                            Update
                                        </Button>
                                    </Form.Item>

                                </Row>
                            </Form>

                        </Card>

                    </div>
                    <Row align="middle" justify="end" style={{ height: '10vh' }}>
                        <Button size={"large"} onClick={goToPHomePage} >
                            GO BACK
                        </Button>
                    </Row>

                </Card>

            </div >

        </>
    )
}

export default TodoListEditForm