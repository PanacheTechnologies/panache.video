import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useForm } from '@inertiajs/react'
import { IconLogout } from '@tabler/icons-react'
import { useUser } from '~/hooks/use_user'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface AccountDropdownProps {}

const AccountDropdown: React.FunctionComponent<AccountDropdownProps> = () => {
  const user = useUser()

  const signOutForm = useForm()

  const handleSignOut = (e: React.FormEvent) => {
    e.preventDefault()
    signOutForm.post('/auth/sign-out')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer hover:opacity-75 transition">
          <Avatar className="w-7 h-7 rounded-full">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
            <AvatarFallback>{user.email.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <form onSubmit={handleSignOut}>
            <button type="submit" hidden id="sign-out-button" />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => document.getElementById('sign-out-button')?.click()}
            >
              <IconLogout className="h-4 w-4" />

              <span>Sign Out</span>
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
