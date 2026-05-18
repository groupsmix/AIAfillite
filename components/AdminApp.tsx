'use client';

import { useEffect, useMemo, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';
import type { Category, Product, Post } from '@/lib/types';

type Tab = 'products' | 'categories' | 'posts';
const emptyProduct = { name: '', slug: '', short_description: '', description: '', category_id: '', image_url: '', affiliate_url: '', rating: 4.5, featured: false, pros: '', cons: '', features: '', pricing_summary: '', best_for: '', seo_title: '', seo_description: '', status: 'draft' };
const emptyCategory = { name: '', slug: '', description: '' };
const emptyPost = { title: '', slug: '', excerpt: '', content: '', image_url: '', seo_title: '', seo_description: '', status: 'draft' };

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function lines(value: string) { return value.split('\n').map((x) => x.trim()).filter(Boolean); }

export function AdminApp() {
  const supabase = useMemo(() => createBrowserSupabase(), []);
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [productForm, setProductForm] = useState<any>(emptyProduct);
  const [categoryForm, setCategoryForm] = useState<any>(emptyCategory);
  const [postForm, setPostForm] = useState<any>(emptyPost);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSession(data.session)); const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s)); return () => sub.subscription.unsubscribe(); }, [supabase]);
  // loadAll is a stable function declaration using the current Supabase client.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (session) void loadAll(); }, [session]);

  async function loadAll() {
    const [p, c, po] = await Promise.all([
      supabase.from('products').select('*, category:categories(*)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
      supabase.from('posts').select('*').order('created_at', { ascending: false })
    ]);
    setProducts((p.data || []) as Product[]); setCategories((c.data || []) as Category[]); setPosts((po.data || []) as Post[]);
  }

  async function login(e: React.FormEvent) {
    e.preventDefault(); setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault(); setMessage('');
    const payload = { ...productForm, slug: productForm.slug || slugify(productForm.name), category_id: productForm.category_id || null, rating: Number(productForm.rating) || null, pros: lines(productForm.pros), cons: lines(productForm.cons), features: lines(productForm.features) };
    const res = editingId ? await supabase.from('products').update(payload).eq('id', editingId) : await supabase.from('products').insert(payload);
    if (res.error) setMessage(res.error.message); else { setProductForm(emptyProduct); setEditingId(null); await loadAll(); }
  }

  async function saveCategory(e: React.FormEvent) {
    e.preventDefault(); const payload = { ...categoryForm, slug: categoryForm.slug || slugify(categoryForm.name) };
    const res = editingId ? await supabase.from('categories').update(payload).eq('id', editingId) : await supabase.from('categories').insert(payload);
    if (res.error) setMessage(res.error.message); else { setCategoryForm(emptyCategory); setEditingId(null); await loadAll(); }
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault(); const payload = { ...postForm, slug: postForm.slug || slugify(postForm.title) };
    const res = editingId ? await supabase.from('posts').update(payload).eq('id', editingId) : await supabase.from('posts').insert(payload);
    if (res.error) setMessage(res.error.message); else { setPostForm(emptyPost); setEditingId(null); await loadAll(); }
  }

  async function remove(table: 'products' | 'categories' | 'posts', id: string) {
    if (!confirm('Delete this item?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) setMessage(error.message); else await loadAll();
  }

  if (!session) return <section className="container max-w-md section-tight"><h1 className="h2">Admin Login</h1><form onSubmit={login} className="card mt-6 space-y-4 p-6"><input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><button className="btn-primary w-full">Login</button>{message && <p className="text-sm text-[#111827]">{message}</p>}</form></section>;

  return <section className="container section-tight"><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="h2">Admin Dashboard</h1><button className="btn-secondary" onClick={() => supabase.auth.signOut()}>Logout</button></div>{message && <p className="mt-4 border-l-2 border-[#111827] bg-[#f3f4f6] p-4 text-[#111827]">{message}</p>}<div className="mt-6 flex gap-2">{(['products','categories','posts'] as Tab[]).map((t) => <button key={t} onClick={() => { setTab(t); setEditingId(null); }} className={tab === t ? 'btn-primary !py-2' : 'btn-secondary !py-2'}>{t}</button>)}</div>
    {tab === 'products' && <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]"><form onSubmit={saveProduct} className="card space-y-4 p-5"><h2 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} product</h2><input className="input" placeholder="Name" value={productForm.name} onChange={(e)=>setProductForm({...productForm,name:e.target.value,slug:productForm.slug || slugify(e.target.value)})} required/><input className="input" placeholder="Slug" value={productForm.slug} onChange={(e)=>setProductForm({...productForm,slug:e.target.value})} required/><textarea className="input" placeholder="Short description" value={productForm.short_description} onChange={(e)=>setProductForm({...productForm,short_description:e.target.value})}/><textarea className="input" placeholder="Full description" value={productForm.description} onChange={(e)=>setProductForm({...productForm,description:e.target.value})}/><select className="input" value={productForm.category_id} onChange={(e)=>setProductForm({...productForm,category_id:e.target.value})}><option value="">No category</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><input className="input" placeholder="Image URL" value={productForm.image_url} onChange={(e)=>setProductForm({...productForm,image_url:e.target.value})}/><input className="input" placeholder="Affiliate URL" value={productForm.affiliate_url} onChange={(e)=>setProductForm({...productForm,affiliate_url:e.target.value})} required/><input className="input" type="number" step="0.1" placeholder="Rating" value={productForm.rating} onChange={(e)=>setProductForm({...productForm,rating:e.target.value})}/><textarea className="input" placeholder="Pros, one per line" value={productForm.pros} onChange={(e)=>setProductForm({...productForm,pros:e.target.value})}/><textarea className="input" placeholder="Cons, one per line" value={productForm.cons} onChange={(e)=>setProductForm({...productForm,cons:e.target.value})}/><textarea className="input" placeholder="Features, one per line" value={productForm.features} onChange={(e)=>setProductForm({...productForm,features:e.target.value})}/><input className="input" placeholder="Pricing summary" value={productForm.pricing_summary} onChange={(e)=>setProductForm({...productForm,pricing_summary:e.target.value})}/><input className="input" placeholder="Best for" value={productForm.best_for} onChange={(e)=>setProductForm({...productForm,best_for:e.target.value})}/><input className="input" placeholder="SEO title" value={productForm.seo_title} onChange={(e)=>setProductForm({...productForm,seo_title:e.target.value})}/><textarea className="input" placeholder="SEO description" value={productForm.seo_description} onChange={(e)=>setProductForm({...productForm,seo_description:e.target.value})}/><label className="flex gap-2"><input type="checkbox" checked={productForm.featured} onChange={(e)=>setProductForm({...productForm,featured:e.target.checked})}/> Featured</label><select className="input" value={productForm.status} onChange={(e)=>setProductForm({...productForm,status:e.target.value})}><option value="draft">Draft</option><option value="published">Published</option></select><button className="btn-primary">Save product</button></form><ItemList items={products} edit={(p:any)=>{setProductForm({...p,pros:(p.pros||[]).join('\n'),cons:(p.cons||[]).join('\n'),features:(p.features||[]).join('\n')});setEditingId(p.id)}} remove={(id)=>remove('products',id)} /></div>}
    {tab === 'categories' && <div className="mt-8 grid gap-8 lg:grid-cols-2"><form onSubmit={saveCategory} className="card space-y-4 p-5"><h2 className="text-xl font-bold">Category</h2><input className="input" placeholder="Name" value={categoryForm.name} onChange={(e)=>setCategoryForm({...categoryForm,name:e.target.value,slug:categoryForm.slug || slugify(e.target.value)})} required/><input className="input" placeholder="Slug" value={categoryForm.slug} onChange={(e)=>setCategoryForm({...categoryForm,slug:e.target.value})} required/><textarea className="input" placeholder="Description" value={categoryForm.description} onChange={(e)=>setCategoryForm({...categoryForm,description:e.target.value})}/><button className="btn-primary">Save category</button></form><ItemList items={categories} edit={(c:any)=>{setCategoryForm(c);setEditingId(c.id)}} remove={(id)=>remove('categories',id)} /></div>}
    {tab === 'posts' && <div className="mt-8 grid gap-8 lg:grid-cols-2"><form onSubmit={savePost} className="card space-y-4 p-5"><h2 className="text-xl font-bold">Post</h2><input className="input" placeholder="Title" value={postForm.title} onChange={(e)=>setPostForm({...postForm,title:e.target.value,slug:postForm.slug || slugify(e.target.value)})} required/><input className="input" placeholder="Slug" value={postForm.slug} onChange={(e)=>setPostForm({...postForm,slug:e.target.value})} required/><textarea className="input" placeholder="Excerpt" value={postForm.excerpt} onChange={(e)=>setPostForm({...postForm,excerpt:e.target.value})}/><textarea className="input min-h-60" placeholder="Content" value={postForm.content} onChange={(e)=>setPostForm({...postForm,content:e.target.value})}/><input className="input" placeholder="Image URL" value={postForm.image_url} onChange={(e)=>setPostForm({...postForm,image_url:e.target.value})}/><input className="input" placeholder="SEO title" value={postForm.seo_title} onChange={(e)=>setPostForm({...postForm,seo_title:e.target.value})}/><textarea className="input" placeholder="SEO description" value={postForm.seo_description} onChange={(e)=>setPostForm({...postForm,seo_description:e.target.value})}/><select className="input" value={postForm.status} onChange={(e)=>setPostForm({...postForm,status:e.target.value})}><option value="draft">Draft</option><option value="published">Published</option></select><button className="btn-primary">Save post</button></form><ItemList items={posts} edit={(p:any)=>{setPostForm(p);setEditingId(p.id)}} remove={(id)=>remove('posts',id)} /></div>}
  </section>;
}

function ItemList({ items, edit, remove }: { items: any[]; edit: (item:any)=>void; remove:(id:string)=>void }) {
  return <div className="space-y-3">{items.map((item) => <div key={item.id} className="card flex items-center justify-between gap-4 p-4"><div><h3 className="font-bold">{item.name || item.title}</h3><p className="text-sm text-[#6b7280]">/{item.slug} · {item.status || 'category'}</p></div><div className="flex gap-2"><button className="btn-secondary !px-3 !py-2" onClick={()=>edit(item)}>Edit</button><button className="border border-[#111827] bg-[#111827] px-3 py-2 text-sm font-bold text-white" onClick={()=>remove(item.id)}>Delete</button></div></div>)}</div>;
}
