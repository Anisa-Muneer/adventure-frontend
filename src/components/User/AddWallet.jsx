import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import WalletPayment from './WalletPayment'


function AddWallet() {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(null)

    const handleOpen = () => setOpen(!open)
    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    return (
        <>
            <Button onClick={handleOpen} >Add Wallet</Button>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <img className="w-36" alt="Aventure" />
                        <Typography className="mb-1" variant="h5">
                            Add amount to your wallet
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>
                    <div className="grid gap-6">
                        <Typography className="-mb-1" color="blue-gray" variant="h6">
                            Enter Amount
                        </Typography>
                        <Input

                            label="Amount"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>

                    <WalletPayment amount={amount} />
                    {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            Confirm
          </Button> */}
                </DialogFooter>
            </Dialog>
        </>


    )
}

export default AddWallet
