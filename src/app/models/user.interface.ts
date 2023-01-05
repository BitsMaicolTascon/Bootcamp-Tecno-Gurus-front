export interface User {
    documentId: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    cellPhone: string;
    email: string;
    password: string;
    active: boolean;
    role: string;
    perfilImage: string;
    nickname: string;
    AccessTokem: any;
    employee: boolean;
    TokenType: string;
    user: any;
    users: any[];
    status: any;
    body: any;
    success: boolean;
}

interface RegisterResponse {
  body: {
    message: string;
  },
  status: {
    error: string;
  },
  success: boolean;
}



/* {
  "body": {},
  "status": {
      "error": "User already exists "
  },
  "success": false
} */
