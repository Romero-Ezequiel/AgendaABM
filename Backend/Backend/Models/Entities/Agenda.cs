using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Entities
{
    public class Agenda
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string nombre { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string apellido { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string domicilio { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string telefono { get; set; }


    }
}
