package nazeem.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppMain {
    public static void main(String[] args) {
        SpringApplication.run(AppMain.class, args);
    }
}

/*
*
netstat -aon | findstr "9090"

localhost:9090/api/secure/hello
localhost:9090/api/test/all
localhost:9090/api/auth/signin
{
	"username":"nazeem",
	"password":"123456"
}
{
    "id": 1,
    "username": "nazeem",
    "email": "syed.noman.azeem@gmail.com",
    "roles": [
        "ADMIN"
    ],
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYXplZW0iLCJpYXQiOjE2MTg3Mjk1NDQsImV4cCI6MTYxODgxNTk0NH0.YZLcN9CVoOJlj7pzRKSIZwmX5ITvWfwmAXaHJdV9YJ9_Jy2exQWflluI2Tj-CIc_bzY1L5QP71dTLlJr_bs3yw",
    "tokenType": "Bearer"
}

localhost:9090/api/auth/signup
{
	"username":"nazeem",
	"email":"syed.noman.azeem@gmail.com",
	"password":"123456",
    "role":"admin"
}


* */