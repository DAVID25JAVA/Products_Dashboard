"use client";
import useProductStore from "@/store/useProductStore";
import { Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useEffect } from "react";

export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(10, 0);
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.id}>
          <Card>
            <CardMedia image={p.thumbnail} sx={{height:200}} />
            <CardContent>
              <h3>{p.title}</h3>
              <p>${p.price}</p>
              <p>{p.rating}</p>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
