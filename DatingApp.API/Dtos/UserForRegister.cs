using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(6,MinimumLength =3,ErrorMessage ="You must specify password between 3 to 6 character")]
        public string Password { get; set; }
    }
}
