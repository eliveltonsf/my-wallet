import React, { useState } from 'react';

import logoimg from '../../assets/logo.svg'

import {
  Container,
  Header,
  LogImg,
  Title,
  MenuContainer,
  MenuItemLink,
  ToggleMenu,
  ThemeToggleFooter
} from './styles'

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu
} from 'react-icons/md'

import {useAuth} from '../../hooks/auth'
import {useTheme} from '../../hooks/theme'

import { Toggle } from '..';

const Aside: React.FC = () => {
  const [ toggleIsMenuOpemed, setToggleIsMenuOpemed ] = useState<boolean>( false )
  const { singOut } = useAuth()
  const { toggleTheme, theme } = useTheme()

  const handleToggleMenu = () => {
    setToggleIsMenuOpemed(!toggleIsMenuOpemed);
  }

  const [darkTheme, setDarkTheme] = useState(()=> theme.title === 'dark' ? true : false)

  const  handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  return (
    <Container menuIsOpen={toggleIsMenuOpemed}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
         {toggleIsMenuOpemed ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

        <LogImg src={logoimg} />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href='/'>
          <MdDashboard />
          Dashboard
        </MenuItemLink>

        <MenuItemLink href='/list/entry-balance'>
          <MdArrowUpward />
          Entradas
        </MenuItemLink>

        <MenuItemLink href='/list/exit-balance'>
          <MdArrowDownward />
          Saidas
        </MenuItemLink>

        <MenuItemLink onClick={() => singOut()}>
          <MdExitToApp />
          Sair
        </MenuItemLink>
      </MenuContainer>

      <ThemeToggleFooter menuIsOpen={toggleIsMenuOpemed}>
        <Toggle 
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  )
}

export default Aside;