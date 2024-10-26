using System.ComponentModel.DataAnnotations;

 public class UpdateItemDto
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Img { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int ItemCount { get; set; }

        [Required]
        [StringLength(1000)]
        public string Descr { get; set; }

        [Required]
        [RegularExpression("^(Sticker|Jumper|Print|Tshirt)$")]

        public string Category { get; set; }
    }
