'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"

export default function Home() {
  // State variables
  const [inventory, setInventory] = useState([]) // Stores the inventory items
  const [openAddModal, setOpenAddModal] = useState(false) // Controls the visibility of the add item modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false) // Controls the visibility of the update item modal
  const [itemName, setItemName] = useState('') // Holds the name of the item to be added
  const [selectedItem, setSelectedItem] = useState(null) // Holds the selected item for updating
  const [updatedName, setUpdatedName] = useState('') // Holds the updated name for the selected item
  const [updatedQuantity, setUpdatedQuantity] = useState('') // Holds the updated quantity for the selected item
  const [searchQuery, setSearchQuery] = useState('') // Holds the current search query

  // Function to fetch inventory data from Firestore
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  // Function to add an item to the inventory
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  // Function to remove an item from the inventory
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if(quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  // Function to update an item in the inventory
  const handleUpdate = async () => {
    const docRef = doc(collection(firestore, 'inventory'), selectedItem.name)
    if (updatedQuantity <= 0) {
      await deleteDoc(docRef)
    } else {
      await setDoc(docRef, { quantity: updatedQuantity })
      if (selectedItem.name !== updatedName) {
        const newDocRef = doc(collection(firestore, 'inventory'), updatedName)
        await setDoc(newDocRef, { quantity: updatedQuantity })
        await deleteDoc(docRef)
      }
    }
    await updateInventory()
    handleCloseUpdateModal()
  }

  // Fetch inventory data when the component mounts
  useEffect(()=>{
    updateInventory()
  }, [])

  // Modal handlers
  const handleOpenAddModal = () => setOpenAddModal(true)
  const handleCloseAddModal = () => setOpenAddModal(false)
  const handleOpenUpdateModal = (item) => {
    setSelectedItem(item)
    setUpdatedName(item.name)
    setUpdatedQuantity(item.quantity)
    setOpenUpdateModal(true)
  }
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)

  // Filtered inventory based on the search query
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={2}
    >
      {/* Add Item Modal */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box
          position='absolute'
          top='50%'
          left='50%'
          width={400}
          bgcolor='white'
          border='2px solid #000'
          boxShadow={24}
          p={4}
          display='flex'
          flexDirection='column'
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant='h6'>Add Item</Typography>
          <Stack width='100%' direction='row' spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
            <Button
              variant='outlined'
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleCloseAddModal()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Update Item Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box
          position='absolute'
          top='50%'
          left='50%'
          width={400}
          bgcolor='white'
          border='2px solid #000'
          boxShadow={24}
          p={4}
          display='flex'
          flexDirection='column'
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant='h6'>Update Item</Typography>
          <Stack width='100%' direction='column' spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              label="Item Name"
              value={updatedName}
              onChange={(e) => {
                setUpdatedName(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              fullWidth
              label="Quantity"
              value={updatedQuantity}
              onChange={(e) => {
                setUpdatedQuantity(e.target.value)
              }}
            />
            <Button
              variant='outlined'
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Add New Item Button */}
      <Button
        variant='contained'
        onClick={handleOpenAddModal}
      >
        Add New Item
      </Button>

      {/* Search Input Field */}
      <TextField
        variant='outlined'
        fullWidth
        placeholder='Search Items'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Inventory List */}
      <Box border='1px solid #333'>
        <Box
          width='800px'
          height='100px'
          bgcolor='#ADD8E6'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='h2' color='#333'>
            Inventory Items
          </Typography>
        </Box>
        <Stack width='800px' height='300px' spacing={2} overflow='auto'>
          {filteredInventory.map((item) => (
            <Box
              key={item.name}
              width='100%'
              minHeight='150px'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              bgColor='#f0f0f0'
              padding={5}
            >
              <Typography variant='h3' color='#333' textAlign='center'>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography variant='h3' color='#333' textAlign='center'>
                {item.quantity}
              </Typography>
              <Stack direction='row' spacing={2}>
                <Button
                  variant='contained'
                  onClick={() => {
                    addItem(item.name)
                  }}
                >
                  Add
                </Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    removeItem(item.name)
                  }}
                >
                  Remove
                </Button>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleOpenUpdateModal(item)
                  }}
                >
                  Update
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
