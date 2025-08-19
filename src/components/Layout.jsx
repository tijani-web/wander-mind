import Footer from './Footer'
import WandermindFooter from './Footer'
import Header from './Header'
import './Layout.css' 

export const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Header/>
      <main className="layout-main-content">{children}</main>
      <Footer/>
    </div>
  )
}