import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import { Button, Table, Tr, Th, Td, Tbody, Thead, Container, Heading, Select, TableContainer, useColorMode } from "@chakra-ui/react";
import Footer from "../components/Footer";

const Student = () => {
    const [students, setStudents] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isUpdate, setIsUpdate] = useState(1)
    const [allStudent, setAllStudent] = useState(null)
    
    const navigate = useNavigate()
    const { colorMode } = useColorMode()

    useEffect(() => {
        fetch("http://localhost:3001/student")
          .then((response) => response.json())
          .then((json) => {
            setStudents(json);
            setAllStudent(json)
            setLoading(false);
            setIsUpdate(isUpdate++)
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
    }, [isUpdate]);

    const handleChange = (e) => {
        setStudents(allStudent)
        e.target.value !== "All" && setStudents((prev) => prev.filter((data) => data.faculty === e.target.value))
    }

    async function handleDelete(id) {
        try {
          await deleteStudent(id)
          setIsUpdate(isUpdate + 1)
        } catch (error) {
          console.log(error);
          console.log('Terjadi kesalahan saat menghapus student');
        }
      }

    async function deleteStudent(studentId) {
        try {
            await fetch(`http://localhost:3001/student/${studentId}`, {
                method: "DELETE"
            })
        } catch (error) {
          console.log(error);
          console.log('Terjadi kesalahan saat menghapus student');
        }
      }
    
    return (
        <Container p="0" maxW="full" minH="100vh" bg={colorMode === "light" ? "bgLight" : "bgDark"} textColor={colorMode === "light" ? "textLight" : "textDark"} centerContent>
            <Navbar />
            <Heading m="10">All Student</Heading>
            <Select data-testid="filter" onChange={handleChange} maxW="80%" mb="10">
                <option value="All" >All</option>
                <option value="Fakultas Ekonomi" >Fakultas Ekonomi</option>
                <option value="Fakultas Ilmu Sosial dan Politik" >Fakultas Ilmu Sosial dan Politik</option>
                <option value="Fakultas Teknik" >Fakultas Teknik</option>
                <option value="Fakultas Teknologi Informasi dan Sains" >Fakultas Teknologi Informasi dan Sains</option>
            </Select>
            {loading ? (<p class="my-4">Loading ...</p>)
            : (
              <TableContainer mb="20" width="80%" minHeight="50vh">
                <Table id="table-student">
                  <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Full Name</Th>
                        <Th>Faculty</Th>
                        <Th>Program Study</Th>
                        <Th>Option</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {students &&
                            students.map((student) => (
                                <Tr key={student.id} class="student-data-row">
                                <Td>{student.id}</Td>
                                <Td onClick={() => navigate("/student/" + student.id)}>{student.fullname}</Td>
                                <Td>{student.faculty}</Td>
                                <Td>{student.programStudy}</Td>
                                <Td><Button type="button" id="delete-btn" data-testid={`delete-${student.id}`} onClick={() => handleDelete(student.id)} variant="red" size="sm">Delete</Button></Td>
                                </Tr>
                            ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
            <Footer />
        </Container>
    );
};

export default Student;
