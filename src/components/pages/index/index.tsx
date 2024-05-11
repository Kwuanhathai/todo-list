import { Card, Typography, Row, Input, Form, Button, Modal } from "antd"
import ToDoElement from "../../subcomponents/todo-element/todo-element";
import axios from "axios";


const { Text } = Typography
const { TextArea } = Input

type FieldType = {
    title?: string;
    description?: string;
    isDone?: string;
};


function Index(props: any) {
    const { data } = props

    const todoItem = data?.map((data: any, index: number) => {
        return <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <ToDoElement dataItem={data} />
        </div>

    });


    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    const onFinish = async (values: any) => {
        const { title, description, isDone } = values

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('isDone', isDone)

        try {
            const response = await axios.post(`http://localhost:8000/api/todos`, formData, { headers })

            if (response.data != null) {

                Modal.success({
                    title: 'SUCCESSFULLY UPLOADED',
                    content: 'The product list has been uploaded',
                });
            }

            setTimeout(function () {
                history.go(0)
            }, 3000);


        } catch (error) {
            console.error('Error uploading image:', error)

            Modal.error({
                title: 'UPLOAD FAILED',
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
                        width: "90%",
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
                                    To-Do List
                                </Text>
                            </Row>

                            <Form
                                name="add_todo"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                method="post"
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Form.Item<FieldType>
                                        label="Title"
                                        name="title"
                                        style={{
                                            width: "100%",
                                            fontWeight: "bold"
                                        }}
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 19 }}
                                        rules={[{ required: true, message: 'Please input your title!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item<FieldType>
                                        label="Description"
                                        name="description"
                                        style={{
                                            width: "100%",
                                            fontWeight: "bold"
                                        }}
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 19 }}
                                    >
                                        <TextArea
                                            rows={5}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row justify='center'>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#3bb85c', fontWeight: 'bold' }}>
                                            Add
                                        </Button>
                                    </Form.Item>
                                </Row>
                            </Form>

                        </Card>
                    </div>

                    {todoItem}

                </Card>

            </div >





        </>
    )
}

export default Index