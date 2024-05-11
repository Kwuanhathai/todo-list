import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/pages/index";
import TodoListEditForm from "./components/pages/todo-list-edit-form/todo-list-edit-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons"
import { Typography } from "antd";

const { Text } = Typography


function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState<boolean>(true);


  const getData = async () => {
    setLoading(true)

    await axios.get(`http://localhost:8000/api/todos`).then(({ data }) => {
      setData(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoadingOutlined style={{ fontSize: "10rem", fontWeight: "bold", color: "white", marginRight: "1%" }} />
      <Text style={{ fontSize: "3.2rem", fontWeight: "bold", color: "white" }}>Loading...</Text>
    </div>
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index data={data} />} />
          <Route path="edit/:todoID" element={<TodoListEditForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
