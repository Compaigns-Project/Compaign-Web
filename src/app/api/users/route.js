export async function GET(req,res,next) {
    let users = [
        {
            id : 1,
            name : 'hassaan',
            email: 'hassaanse@gmail.com'
        },
        {
             id : 2,
            name : 'hassaan',
            email: 'hassaanse@gmail.com'
        }
       
    ]

    let data = JSON.stringify(users);
    return new Response(data)
}



