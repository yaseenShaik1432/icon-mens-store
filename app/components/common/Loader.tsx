"use client";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="orange"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    </>
  );
}
