<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function reservation(Request $request)
    {
        $files = [];
        try {
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('public/images');
                    $fileName = $file->getClientOriginalName();
                    $fileData = File::create([
                        'name' => $fileName,
                        'path' => $path
                    ]);
                    $files[] = [
                        'id' => $fileData->id,
                        'name' => $fileName,
                        'path' => $path,
                    ];
                }
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()]);
        }
        return response()->json(['status' => 200, 'data' => $files]);
    }

    public function get(Request $request, $id)
    {
        $file = File::find($id);
        if ($file) {
            return response()->download(storage_path('app/' . $file->path), $file->name);
        }
        return response()->json(['status' => 404, 'message' => 'File not found']);
    }
}
