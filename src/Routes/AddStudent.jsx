import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button, Container, Heading, Select, FormControl, Input, FormLabel, useColorMode } from "@chakra-ui/react";
import Footer from "../components/Footer";

const AddStudent = () => {
    const [newStudent, setNewStudent] = useState({})

    const navigate = useNavigate()
    const { colorMode } = useColorMode()

    function handleChange(e){
        const name = e.target.name
        const value = e.target.value

        setNewStudent({...newStudent, [name]: value})
    }

    function getFaculty(){
        let tempData = newStudent
        let prodi = newStudent.programStudy

        if(prodi === "Ekonomi" || prodi === "Manajemen" || prodi === "Akuntansi") tempData.faculty = "Fakultas Ekonomi"
        else if(prodi === "Administrasi Publik" || prodi === "Administrasi Bisnis" || prodi === "Hubungan Internasional") tempData.faculty = "Fakultas Ilmu Sosial dan Politik"
        else if(prodi === "Teknik Sipil" || prodi === "Arsitektur") tempData.faculty = "Fakultas Teknik"
        else tempData.faculty = "Fakultas Teknologi Informasi dan Sains"

        return tempData
    }

    async function handleAdd(e){
        try {
            e.preventDefault()
            let data = getFaculty()

            await addStudent(data)
            navigate("/student")
        } catch (error) {
          console.log(error);
          console.log('Terjadi kesalahan saat menambah student');
        }
    }

    async function addStudent(studentData) {
        try {
            await fetch(`http://localhost:3001/student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });
        } catch (error) {
          console.log(error);
          console.log('Terjadi kesalahan saat menghapus student');
        }
    }

    return (
        <Container p="0" maxW="full" minH="100vh" bg={colorMode === "light" ? "bgLight" : "bgDark"} textColor={colorMode === "light" ? "textLight" : "textDark"} centerContent>
            <Navbar />
            <Heading m="10">Add Student</Heading>
            <Container id="form-student" maxW="40%">
                <FormControl isRequired my="5">
                    <FormLabel>Fullname</FormLabel>
                    <Input id="input-name" name="fullname" data-testid="name" onChange={handleChange} placeholder='Full name' />
                </FormControl>
                <FormControl isRequired my="5">
                    <FormLabel>Profile Picture</FormLabel>
                    <Input id="profilePicture" name="profilePicture" data-testid="profilePicture" onChange={handleChange} placeholder='Picture link' />
                </FormControl>
                <FormControl isRequired my="5">
                    <FormLabel>Address</FormLabel>
                    <Input id="address" name="address" data-testid="address" onChange={handleChange} placeholder='City, Country' />
                </FormControl>
                <FormControl isRequired my="5">
                    <FormLabel>Phone Number</FormLabel>
                    <Input id="phoneNumber" name="phoneNumber" data-testid="phoneNumber" onChange={handleChange} placeholder='Phone number' />
                </FormControl>
                <FormControl isRequired my="5">
                    <FormLabel>Birth Date</FormLabel>
                    <Input type="date" id="input-date" name="birthDate" data-testid="date" onChange={handleChange} />
                </FormControl>
                <FormControl isRequired my="5">
                    <FormLabel>Gender</FormLabel>
                    <Select id="input-gender" name="gender" data-testid="gender" onChange={handleChange} placeholder='Select gender'>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </Select>
                </FormControl>
                <FormControl isRequired my="5">
                    <FormLabel>Program Study</FormLabel>
                    <Select id="input-prody" name="programStudy" data-testid="prody" onChange={handleChange} placeholder='Select program study'>
                        <option value="Ekonomi">Ekonomi</option>
                        <option value="Manajemen">Manajemen</option>
                        <option value="Akuntansi">Akuntansi</option>
                        <option value="Administrasi Publik">Administrasi Publik</option>
                        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                        <option value="Hubungan Internasional">Hubungan Internasional</option>
                        <option value="Teknik Sipil">Teknik Sipil</option>
                        <option value="Arsitektur">Arsitektur</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Fisika">Fisika</option>
                        <option value="Informatika">Informatika</option>
                    </Select>
                </FormControl>
                <Container mb="10" centerContent>
                    <Button id="add-btn" data-testid="add-btn" onClick={handleAdd} variant={colorMode === "light" ? "light" : "dark"} my="5">Add Student</Button>
                </Container>
            </Container>
            <Footer />
        </Container>
    );
};

export default AddStudent;
