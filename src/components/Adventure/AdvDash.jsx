import React from 'react';
import banner from "../../assets/images/travel.jpg";
import { Input, Typography, Button } from '@material-tailwind/react';

function AdvDash() {
  return (
    <div>
      <figure className="relative h-[500px] w-full">
        <img
          className="h-full w-full object-cover object-center"
          src={banner}
          alt="nature image"
        />
        <figcaption className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex w-3/6 justify-center bg-transparent py-4 px-6 shadow-lg shadow-black/5 saturate-200">
          <div className="flex flex-col">
            <div className="pb-8 w-2/3 self-center">
              <Typography
                variant="h1"
                color="blue-gray"
                className="font-semibold"
              >
                {/* Your heading content */}
              </Typography>
            </div>
            <div className="flex flex-col items-center"> {/* Center items horizontally */}
              <Typography variant="h6"> {/* Your subheading content */}</Typography>
              <form className="mt-4 w-full max-w-md">
                <div className="flex items-center justify-between">
                  <Input
                    type="search"
                    placeholder="Search"
                    containerProps={{
                      className: "min-w-[288px]",
                    }}
                    className="!border-orange-800 pl-9 placeholder:text-black focus:!border-blue-gray-900 bg-gray-400"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Button
                    type="submit"
                    size="md"
                    className="ml-2 rounded-lg"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default AdvDash;
