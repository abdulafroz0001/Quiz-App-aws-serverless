import React from "react"
import ContentLoader from "react-content-loader"

const LoadingSkeleton = (props) => (
    <>
    <ContentLoader 
    speed={2}
    width={400}
    height={650}
    viewBox="0 0 400 650"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="50" y="60" rx="2" ry="2" width="600" height="400" />
  </ContentLoader>

    <ContentLoader 
    speed={2}
    width={400}
    height={650}
    viewBox="0 0 400 650"

    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="50" y="60" rx="2" ry="2" width="600" height="400" />
  </ContentLoader>
    <ContentLoader 
    speed={2}
    width={400}
    height={650}
    viewBox="0 0 400 650"

    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="50" y="60" rx="2" ry="2" width="600" height="400" />
  </ContentLoader>
  </>
)

export default LoadingSkeleton

