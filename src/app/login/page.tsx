import Input from "@components/public/Input";

export default function LoginPage() {
    return (
        <div>
            <h1>로그인</h1>
            <Input type="text" />
            <Input type="password" />
            <button>로그인</button>
            <p>로그인에 어려움이 있으신가요?</p>
        </div>
    )
}