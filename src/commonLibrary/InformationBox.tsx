import { FC } from "react"

interface CustomAttribute {
    text: string
}

export const InformationBox:FC<CustomAttribute> = (CustomAttribute) => {

    return (
        <div className="white_border">
            <div className="InformationBox_text">
                {CustomAttribute.text}
            </div>
        </div>
    )
}