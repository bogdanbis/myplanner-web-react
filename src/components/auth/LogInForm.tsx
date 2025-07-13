import api from "@/api";
import MpButton from "@/components/ui/buttons/MpButton";
import MpForm from "@/components/ui/form/MpForm";
import MpFormInput from "@/components/ui/form/MpFormInput";
import { useState } from "react";

export default function LogInForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const logIn = async () => {
        setLoading(true);
        try {
            await api.logIn(email, password);
            window.location.reload();
        } catch (e) {
            console.error(e);
            // TODO - show toast
        }
        setLoading(false);
    }

    const LogInFormActions = () => {
        return (
            <MpButton type="submit" disabled={!Boolean(email && password)} busy={loading}>
                Log In
            </MpButton>
        )
    }

    return (
        <MpForm cols="1" onSubmit={logIn} actionsChildren={<LogInFormActions />}>
            <MpFormInput
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onInput={e => setEmail(e.target.value)}
            />
            <MpFormInput
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onInput={e => setPassword(e.target.value)}
            />
        </MpForm>
    )
}
