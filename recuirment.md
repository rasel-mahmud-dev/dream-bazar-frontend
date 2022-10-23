# Dream Bazar


Dream Bajar is Multi-Product and Vendor Ecommerce website, build with Nodejs, 
React js and Mongodb


# CLIENT
## Functional requirement.
- Navigation bar
- Homepage
- Player [desktop in bottom] 
- login page
- registration page
- user dashboard [ANY USER]
  - favorite list
  - playlists
  - change password form
  - change avatar
  - avatar
- admin dashboard [ONLY FOR ADMIN]
  - add new song
  - update song
  - delete song
  - delete user
  - add artist
  - add genre
  - add playlist for everyone

# BACKEND
## Functional requirement.
- Social Google Authentication
- Local Authentication.
    - Hash password
    - Email verification
    - Forgot password.
    - block user

## Database requirement.
- Mongodb


## Functional analysis.
### Models

**User2**
- _id?: ObjectId
- username: string
- firstName: string
- lastName?: string
- email: string,
- password?: string
- createdAt?: Date
- updatedAt?: Date
- roles: Roles[]
- avatar?: string
- accountStatus?: boolean


**Products**
- _id?: ObjectId
- title: string
- price: number
- discount?: number
- attributes?: object
- coverPhoto: string
- images?: string[]
- qty: number
- sold?: number
- views?: number
- brandId?:  ObjectId
- categoryId?:  ObjectId
- sellerId?:  string
- authorId:  string
- createdAt?: Date
- updatedAt?: Date
- isApproved: boolean




### Endpoint

User2 endpoint
 - POST /auth/login [public]
