import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        style={{marginRight: '25px'}}
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="265" rx="5" ry="5" width="260" height="26" />
        <rect x="0" y="305" rx="5" ry="5" width="260" height="70" />
        <rect x="0" y="393" rx="5" ry="5" width="90" height="27" />
        <circle cx="130" cy="120" r="120" />
        <rect x="110" y="387" rx="33" ry="33" width="150" height="42" />
    </ContentLoader>
)

export default Skeleton