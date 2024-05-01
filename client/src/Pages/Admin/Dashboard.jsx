'use-client'
import * as React from 'react';
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom"
import { Button } from "../../../src/Components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../../../src/Components/ui/table"
import Navbar from "../../Components/Navbar/Navbar"

export default function Dashboard() {
    
    // const navigate = useNavigate()
    // React.useEffect(() => {
    //     localStorage.getItem("token") == null ? function(){
    //         window.load
    //         navigate('/home')
    //     } : ''
    // }, [])
  const [events, setEvents] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [users, setUsers] = React.useState([]);

    const getEvents = async() => {
      const response = await axios.get("http://localhost:3010/events", {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      setEvents(response.data)
    }
///////////////////////////////
    const getAdmins = async() => {
      const response = await axios.get("http://localhost:3010/admins", {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      setAdmins(response.data.admins)
    }
///////////////////////////////
  const getUsers = async() => {
    const response = await axios.get("http://localhost:3010/users", {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    setUsers(response.data)
  }
///////////////////////////////
    React.useEffect(() => {
      getEvents()
      getAdmins()
      getUsers()
    }, [])
    return (
      <div className="flex h-screen w-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col p-4 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Events</h1>
            <Button className="ml-auto" size="sm">
              <Link to={'/dashboard/addEvent'}>Create Event</Link>
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  events && events.map((event, index) =>{
                    return (
                <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={event.id || index}>
                  <TableCell className="font-semibold">{event.eventName}</TableCell>
                  <TableCell>Central Park</TableCell>
                  <TableCell className="hidden md:table-cell">{event.eventType}</TableCell>
                  <TableCell className="hidden md:table-cell">{event.eventCategory}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link className="btn btn-success m-1">Update</Link>
                    <Link className="btn btn-danger">Delete</Link>
                  </TableCell>
                </TableRow>

                    )
                  }) 
                }
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <h1 className="font-semibold text-lg md:text-2xl">Admins</h1>
            <Button className="ml-auto" size="sm">
              Add admin
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{
                admins && admins.map((admin, index) => {
                  return (
                <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={admin.id || index}>
                  <TableCell className="font-semibold">{admin.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{admin.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{admin.role}</TableCell>
                  <TableCell className="hidden md:table-cell">                    
                    <Link className="btn btn-success m-1">Update</Link>
                    <Link className="btn btn-danger">Delete</Link>
                  </TableCell>
                </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
            <Button className="ml-auto" size="sm">
              Add user
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  users && users.map((user, index) => {
                    return (
                <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={user.id || index}>
                  <TableCell className="font-semibold">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link className="btn btn-success m-1">Update</Link>
                    <Link className="btn btn-danger">Delete</Link>
                  </TableCell>
                </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    )
  }
  

  
 