import { Container, Typography, Grid, Button, Card, CardContent, CardMedia, Chip } from "@mui/material";

const categories = ["ALL", "COMBOS", "POPCORN", "SNACKS", "BEVERAGES"];

const foodItems = [
    { id: 1, name: "Festival Combo", description: "Salt Popcorn 55gms + Nachos 140gms + 2 Dew 300ml", price: 630, image: "https://via.placeholder.com/100", category: "COMBOS" },
    { id: 2, name: "Tub Salted Popcorn 110gms", description: "Tub Salted Popcorn 110gms", price: 250.01, image: "https://via.placeholder.com/100", category: "POPCORN" },
    { id: 3, name: "Cheese Popcorn 110gms", description: "Cheese Popcorn 110gms", price: 280, image: "https://via.placeholder.com/100", category: "POPCORN" },
    { id: 4, name: "Peri Peri French Fries 130gms", description: "Peri Peri French Fries 130gms", price: 210, image: "https://via.placeholder.com/100", category: "SNACKS" },
    { id: 5, name: "2 Pcs Aloo Samosa", description: "2 Pcs Aloo Samosa", price: 130, image: "https://via.placeholder.com/100", category: "SNACKS" },
    { id: 6, name: "Chicken Pizza", description: "Chicken Pizza", price: 260, image: "https://via.placeholder.com/100", category: "SNACKS" },
];

const FoodMenu = () => {
    return (
        <Container>
            <Typography variant="h6" align="center" gutterBottom>
                Grab a <span style={{ color: "red" }}>bite!</span>
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary">
                Now get your favorite snack at a <span style={{ color: "red", fontWeight: "bold" }}>discounted price!</span>
            </Typography>

            {/* Category Filters */}
            <Grid container spacing={1} justifyContent="center" sx={{ my: 2 }}>
                {categories.map((category) => (
                    <Grid item key={category}>
                        <Chip label={category} color={category === "ALL" ? "primary" : "default"} clickable />
                    </Grid>
                ))}
            </Grid>

            {/* Food Items Grid */}
            <Grid container spacing={2}>
                {foodItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                            <CardMedia component="img" sx={{ width: 80, height: 80, borderRadius: 2 }} image={item.image} alt={item.name} />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                <Typography variant="h6" sx={{ mt: 1 }}>₹{item.price}</Typography>
                            </CardContent>
                            <Button variant="outlined" color="error">Add</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FoodMenu;
