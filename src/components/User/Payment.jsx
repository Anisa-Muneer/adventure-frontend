import { Button, Card, CardBody, CardHeader, Dialog, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react'
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Elements, PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from 'react'
import userRequest from '../../utils/userRequest';
import { Navigate, useNavigate } from 'react-router-dom';


function Payment({ secret, advId, slotId, slotDate, booking, categoryName }) {
    console.log(booking, 'payment booking is here');
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null);
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {},
            redirect: 'if_required'
        })
        if (paymentIntent) {
            let bookdata = {
                advId,
                booking,
                slotDate,
                categoryName,
                slotId,
                status: 'completed'
            }
            const response = await userRequest.post('/paymentSuccess', { bookdata })
            if (response.data.success) {
                navigate('/success')
            }
        }
        console.log(bookdata, 'bookdata is here');
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);

    }


    const paymentElementOptions = {
        layout: "tabs",
    };

    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className="flex flex-row justify-center mt-10" onClick={handleOpen}>
                <Button className="rounded-3xl w-72">Book Now</Button>
            </div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none rounded-none"
            >
                <Card className="w-full max-w-[24rem] rounded-none">
                    <CardHeader

                        className="m-0 grid place-items-center h-45 rounded-b-none py- px-4 text-center rounded-none bg-[#023E8A]"
                    >
                        <div className="   p-6 text-white ">
                            <img src='https://img.freepik.com/free-photo/one-person-hiking-mountain-peak-autumn-generated-by-ai_188544-38196.jpg' className="h-20 " />
                        </div>
                        <Typography variant="h4" color="white" className="mb-5">
                            Make your payment
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <div className="flex justify-between">
                            <Typography>Entry Fee</Typography>
                            <Typography>₹ {booking.fee} </Typography>
                        </div>
                        <Tabs value="card" className="overflow-visible">
                            <TabsHeader className="relative z-0 ">
                            </TabsHeader>
                            <TabsBody
                                className="!overflow-x-hidden !erroroverflow-y-visible"
                            >
                                <TabPanel value="card" className="p-0">
                                    <main className="flex-grow flex items-center justify-center shadow-none">
                                        <form
                                            id="payment-form"
                                            onSubmit={handleSubmit}
                                            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
                                        >
                                            <LinkAuthenticationElement
                                                id="link-authentication-element"
                                                // onChange={(e) => setEmail(e.target.value)}
                                                class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            <PaymentElement
                                                id="payment-element"
                                                options={paymentElementOptions}
                                                class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                                            />

                                            <button
                                                disabled={isLoading || !stripe || !elements}
                                                id="submit"
                                                className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 my-1 rounded-md shadow-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring focus:ring-teal-300"
                                            >
                                                <span id="button-text">
                                                    "Pay now"
                                                </span>
                                            </button>
                                            {/* {message && (
                                                <div id="payment-message" className="mt-4 text-red-500">

                                                </div>
                                            )} */}
                                        </form>
                                    </main>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                    >
                                        <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                                        secure and encrypted
                                    </Typography>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </CardBody>
                </Card>
            </Dialog>
        </>
    )
}

export default Payment
