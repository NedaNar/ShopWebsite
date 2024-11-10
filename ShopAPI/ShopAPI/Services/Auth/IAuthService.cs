using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models.Auth;

public interface IAuthService
{
    Task<IActionResult> SignUp(SignUpModel model);
    Task<IActionResult> Login(LoginModel model);
	Task Logout();
}