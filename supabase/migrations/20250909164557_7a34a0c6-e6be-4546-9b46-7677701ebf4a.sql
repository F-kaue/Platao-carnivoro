-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  original_price NUMERIC NOT NULL,
  sale_price NUMERIC NOT NULL,
  marketplace TEXT NOT NULL,
  category TEXT NOT NULL,
  affiliate_link TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  clicks INTEGER DEFAULT 0,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clicks table for tracking
CREATE TABLE public.clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Enable RLS on clicks table
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for products table (allow public read, no auth required for this demo)
CREATE POLICY "Allow public read access to products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete to products" 
ON public.products 
FOR DELETE 
USING (true);

-- Create policies for clicks table (allow public access)
CREATE POLICY "Allow public read access to clicks" 
ON public.clicks 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to clicks" 
ON public.clicks 
FOR INSERT 
WITH CHECK (true);

-- Create policies for storage bucket
CREATE POLICY "Allow public read access to product images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow public upload to product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public delete of product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();