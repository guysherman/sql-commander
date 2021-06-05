async function main () : Promise<number> {
  console.log('hello world!')
  return 0
}

main().then(result => process.exit(result)).catch(err => {
  console.error(err)
  process.exit(1)
})
