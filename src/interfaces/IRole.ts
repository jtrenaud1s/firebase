interface Role {
  name: string
  permissions: [string]
  inherits: [string]
}

export default Role