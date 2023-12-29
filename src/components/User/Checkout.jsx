import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    TabPanel,
    TabsBody,
    TabsHeader,
    Tabs,
} from "@material-tailwind/react";
import {
    LockClosedIcon,
} from "@heroicons/react/24/solid";

import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setuserdetails } from "../../Redux/UserSlice";
import userRequest from "../../utils/userRequest";

function Checkout({ Secret, userId, amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:8800/success",
            },
            redirect: "if_required",
        });
        if (paymentIntent) {
            const res = await userRequest.put(`/walletpaymentSuccess`, { userId, amount });
            if (res.data.status) {
                const userDetails = {
                    id: res.data.data._id,
                    image: res.data.data.image,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    wallet: res.data.data.wallet
                }
                dispatch(setuserdetails({ userInfo: userDetails }))
                navigate("/success");
            }
        }

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured");
        }

        setIsLoading(false);
    };
    const paymentElementOptions = {
        layout: "tabs",
    };
    return (
        <>
            <Card className="w-full max-w-[24rem] rounded-md">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center h-full rounded-b-none py- px-4 text-center rounded-md bg-[#87cabfce]"
                >
                    {/* <div className="   p-6 text-white ">
                        <img className="h-20 " />
                    </div> */}
                    <Typography variant="h4" color="white" className="mb-5">
                        Make your payment
                    </Typography>
                </CardHeader>

                <CardBody>
                    <div className="flex justify-between">
                        <Typography> Wallet Amount</Typography>
                        <Typography>₹ {amount}</Typography>
                        {/* <Typography>₹ {fee * totalDays}</Typography> */}
                    </div>
                    <Tabs value="card" className="overflow-visible">
                        <TabsHeader className="relative z-0 "></TabsHeader>
                        <TabsBody className="!overflow-x-hidden !overflow-y-visible">
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
                                            class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring- -300"
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
                                                {isLoading ? (
                                                    <div className="spinner" id="spinner"></div>
                                                ) : (
                                                    "Pay now"
                                                )}
                                            </span>
                                        </button>
                                        {message && (
                                            <div id="payment-message" className="mt-4 text-red-500">
                                                {message}
                                            </div>
                                        )}
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
        </>
    );
}

export default Checkout;
