// We are making this because we need to render a loading option when button is pressed
"use client"
import React, { ComponentProps } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type FormSubmitButtonProps = {
    children: React.ReactNode, // allows us to put anything in between the buttons
    className?: string, //allows us to style the button as we wish
} & ComponentProps<"button"> //provides with all possible props that can be passed to a button component

const FormSubmitButton = ({children,className, ...props}:FormSubmitButtonProps) => {
    const {pending} = useFormStatus();
  return (
    <button {...props} className={`btn btn-primary ${className}` } type='submit' disabled={pending}>
        {pending && <span className="loading loading-dots loading-sm"></span>}
        {children}</button> 
  )
}

export default FormSubmitButton