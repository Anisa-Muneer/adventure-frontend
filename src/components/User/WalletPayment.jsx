import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Chip, Dialog } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import userRequest from "../../utils/userRequest";
import Checkout from "./Checkout";
const stripePromise = loadStripe('pk_test_51OF855SGN2zHCLENlnBfUdHrHEbCfUNqspaKKfywKGcqCU4FUYgPL2lbowonYJlZR13VbasNRGuflNVvoXN1Pi6e001LUW1lZq');
const WalletPayment = ({ amount }) => {
    // const { id } = useSelector((state) => state.user);
    const { id } = useSelector((state) => state.user.userInfo);
    const [clientSecret, setClientSecret] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    useEffect(() => {
        console.log(id, 'hii');
        if (id) {

            console.log('llllllllllllllllllllllllllllll');
            const makeRequest = async () => {
                console.log(amount, 'pppppppppp');
                try {
                    const res = await userRequest.get(`/walletamount/${id}/${amount}`);
                    console.log(res);
                    setClientSecret(res.data.clientSecret);

                } catch (error) {
                    console.error("Error while making the request", error);
                }
            };

            makeRequest();

        }
    }, [id, amount]);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <Chip
                value="Confirm"
                className="text-center bg-[#028a68]"
                size="lg"
                onClick={handleOpen}
            />
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none rounded-none"
            >
                <div className="app">
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <Checkout amount={amount} Secret={clientSecret} userId={id} />
                        </Elements>
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default WalletPayment;
