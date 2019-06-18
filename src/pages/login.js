import React from 'react'
import Container from '@material-ui/core/Container'
import Layout from '@/layout'
import SEO from '@/seo'
import GoogleLoginButton from 'src/images/google-login-button.png'
import FacebookLoginButton from 'src/images/facebook-login-button.png'

const fbStyle = {
  width: '260px',
  height: '43px'
}
const contStyle = {
  margin: '0 auto',
  width: '50%'
}
const LoginPage = () => (
  <Layout>
    <SEO title="Login" />

    <Container style={contStyle}>
      <a href={`${process.env.GATSBY_API_URL}/auth/google`}>
        <img src={GoogleLoginButton} alt="" />
      </a>

      <a href={`${process.env.GATSBY_API_URL}/auth/facebook`}>
        <img src={FacebookLoginButton} style={fbStyle} alt="" />
      </a>
    </Container>
  </Layout>
)

export default LoginPage
