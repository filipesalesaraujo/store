import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
	return (
		<section className="flex items-center justify-center bg-black h-screen">

			<Card className="w-[350px] bg-white rounded-xl border-[1px] border-black">
				<CardHeader>
					<CardTitle className="text-black">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-5">

						<div className="flex flex-col gap-2.5">
							<Label htmlFor="username" className="text-black">Username</Label>
							<Input type="text" id="username" placeholder="" className="border-gray-300 rounded-xl text-black transition-colors focus:border-blue-300"/>
						</div>

						<div className="flex flex-col gap-2.5">
							<Label htmlFor="password" className="text-black">Password</Label>
							<Input type="password" id="password" placeholder="" className="border-gray-300 rounded-xl text-black transition-colors focus:border-blue-300"/>
						</div>

						<Button className="bg-gray-300 hover:bg-blue-300 rounded-xl border-black">Sign in</Button>

					</form>
				</CardContent>
			</Card>

		</section>
	)
}