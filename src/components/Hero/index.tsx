import React, { useEffect } from "react"
import Image from "next/image"
import HeroImage from "../../assets/9.png"
import Button from "../elements/Button"
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi"
import { InjectedConnector } from "@wagmi/core"
import { useFormatAddress, useEthereum } from "@/hooks/hook"
import FlashMessage from "../elements/FlashMessage"

const Hero = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [connected, setConnected] = React.useState(false)
  const [buttonText, setButtonText] = React.useState("Connect Wallet")
  const [userAddress, setUserAddress] = React.useState<React.SetStateAction<string> | undefined>(
    ""
  )
  const [flash, setFlash] = React.useState({
    message: "",
    type: "",
  })

  const ethereum = useEthereum()

  const formattedAddress = useFormatAddress(userAddress as string)

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = () => {
    if (ethereum) {
      connect()
      setFlash({ ...flash, message: "You successfully connected to Metamask", type: "success" })
    } else {
      setFlash({ ...flash, message: "Please install Metamask", type: "alert" })
    }
  }

  useEffect(() => {
    if (ethereum) {
      if (isConnected) {
        setButtonText("Diconnect Wallet")
        setUserAddress(address)
        setConnected(true)
      }
    }
  }, [isConnected, address])

  const handleDisconnect = () => {
    disconnect()
    setButtonText("Connect Wallet")
    setUserAddress("")
  }

  return (
    <div className="flex flex-col items-center justify-around mb-12">
      <div className="flex flex-col items-center justify-center w-[80%] mb-5">
        <Image src={HeroImage} alt="Hero Image" />
        <h1 className="text-3xl font-semibold text-center text-text my-5 tracking-widest leading-10">
          Settle Your Trade & Trust<span className="font-bold text-secondary-500">Me</span>
        </h1>
        <p className="text-center text-text font-light leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
          luctus, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nisl
          vel tincidunt luctus.
        </p>
      </div>

      <Button
        label={buttonText}
        variant="primary"
        onClick={() => {
          if (connected) {
            handleDisconnect()
            return
          }
          handleConnect()
        }}
        size="large"
        bg="bg-gradient-to-r from-purplish-800 to-secondary-800"
      />

      {flash.message && flash.type === "alert" ? (
        <FlashMessage message={flash.message} type={flash.type} />
      ) : null}

      {isConnected ? (
        <div className="flex flex-col items-center justify-center w-[80%] mt-5">
          <p className="text-center text-text font-light leading-6">{formattedAddress}</p>
        </div>
      ) : null}
    </div>
  )
}

export default Hero
